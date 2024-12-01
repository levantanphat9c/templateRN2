const { execSync } = require('child_process');
const fs = require('fs');

// Cấu hình các loại commit
const COMMIT_TYPES = {
  feat: '🚀 New Features',
  fix: '🐛 Bug Fixes',
  docs: '📚 Documentation',
  style: '💅 Styles',
  refactor: '♻️ Code Refactoring',
  perf: '⚡ Performance Improvements',
  test: '✅ Tests',
  build: '👷 Build System',
  ci: '🔧 CI Configuration',
  chore: '🔨 Chores', // Các thay đổi khác không modify src hoặc test
  revert: '⏪ Reverts',
};

// Kiểm tra xem một chuỗi có phải là commit hash hợp lệ không
function isValidCommitHash(hash) {
  try {
    execSync(`git cat-file -t ${hash}`);
    return true;
  } catch {
    return false;
  }
}

// Chuyển đổi input thành commit hash
function resolveReference(ref) {
  try {
    // Nếu là commit hash hợp lệ, trả về luôn
    if (isValidCommitHash(ref)) {
      return ref;
    }

    // Thử resolve tag hoặc branch name thành commit hash
    const hash = execSync(`git rev-parse ${ref}`).toString().trim();
    if (isValidCommitHash(hash)) {
      return hash;
    }

    throw new Error(`Không thể resolve reference: ${ref}`);
  } catch (error) {
    throw new Error(`Reference không hợp lệ: ${ref}`);
  }
}

function getReleaseNotes(fromRef, toRef = 'HEAD') {
  try {
    // Chuyển đổi references thành commit hashes
    const fromHash = resolveReference(fromRef);
    const toHash = resolveReference(toRef);

    // Lấy tất cả commits giữa 2 references
    const gitLogCommand = `git log ${fromHash}..${toHash} --pretty=format:"%s|%h|%an|%ad" --date=short`;
    const commitLog = execSync(gitLogCommand).toString();

    // Phân loại commits
    const categorizedCommits = {};
    Object.values(COMMIT_TYPES).forEach(type => {
      categorizedCommits[type] = [];
    });

    // Thêm thông tin về range trong release notes
    const fromDesc = execSync(`git describe --tags --always ${fromHash}`).toString().trim();
    const toDesc = execSync(`git describe --tags --always ${toHash}`).toString().trim();

    commitLog.split('\n').forEach(commit => {
      if (!commit) return;

      const [message, hash, author, date] = commit.split('|');

      // Pattern để match cả ticket ID và commit type
      const typeMatch = message.match(/^(?:([A-Z]+-\d+)\s+)?([a-z]+)(\(.*?\))?:/);

      if (typeMatch) {
        const ticketId = typeMatch[1] || ''; // SSV-123
        const type = typeMatch[2]; // feat, fix, etc.
        const category = COMMIT_TYPES[type] || COMMIT_TYPES.chore;

        // Lấy message sạch
        const cleanMessage = message
          .replace(/^([A-Z]+-\d+\s+)?[a-z]+(\(.*?\))?:\s/, '')
          .replace(/\(#\d+\)$/, '')
          .trim();

        categorizedCommits[category].push({
          ticketId,
          message: cleanMessage,
          hash,
          author,
          date,
        });
      }
    });

    // Tạo release notes
    let releaseNotes = `# Release Notes (${new Date().toISOString().split('T')[0]})\n\n`;
    releaseNotes += `## Changes: ${fromDesc} → ${toDesc}\n\n`;

    Object.entries(categorizedCommits).forEach(([category, commits]) => {
      if (commits.length > 0) {
        releaseNotes += `## ${category}\n\n`;
        commits.forEach(({ ticketId, message, hash, author, date }) => {
          const ticketReference = ticketId ? `[${ticketId}] ` : '';
          releaseNotes += `- ${ticketReference}${message} \n`; //([${hash}](commit/${hash})) - ${author} - ${date}\n
        });
        releaseNotes += '\n';
      }
    });

    // Lưu release notes
    const fileName = `.release_notes/release-notes-${new Date().toISOString().split('T')[0]}.md`;

    var dir = './.release_notes';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fileName, releaseNotes);

    console.log(`✅ Release notes đã được tạo trong file ${fileName}`);
    return releaseNotes;
  } catch (error) {
    console.error('❌ Lỗi khi tạo release notes:', error.message);
    throw error;
  }
}

// Hàm main để chạy script
// # Sử dụng tags
// node release-notes.js v1.0.0 v1.1.0

// # Sử dụng commit hashes
// node release-notes.js abc123def456 efg789hij012

// # Kết hợp tag và commit hash
// node release-notes.js v1.0.0 abc123def456

// # Sử dụng một reference và HEAD
// node release-notes.js v1.0.0
// node release-notes.js abc123def456

// # Sử dụng branch names
// node release-notes.js main develop
function main() {
  const args = process.argv.slice(2);
  const fromRef = args[0];
  const toRef = args[1] || 'HEAD';

  if (!fromRef) {
    console.error('❌ Vui lòng cung cấp reference bắt đầu (tag hoặc commit hash)!');
    console.log('Sử dụng: node release-notes.js <fromRef> [toRef]');
    console.log('Ví dụ:');
    console.log('  node release-notes.js v1.0.0 v1.1.0');
    console.log('  node release-notes.js abc123 def456');
    console.log('  node release-notes.js v1.0.0 HEAD');
    console.log('  node release-notes.js abc123');
    process.exit(1);
  }

  getReleaseNotes(fromRef, toRef);
}

main();
