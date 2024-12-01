#!/bin/bash

# Check if remote repository name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <remote_name> [target_branch_path]"
    echo "Example: $0 origin UAT"
    echo "Example: $0 bitbucket release/UAT"
    echo "Example: $0 origin main"
    exit 1
fi

# Define the remote repository name and target branch
REMOTE_NAME="$1"
TARGET_BRANCH="${2:-release/UAT}"  # Default is release/UAT if not provided

# Validate if remote exists
if ! git remote | grep -q "^${REMOTE_NAME}$"; then
    echo "Error: Remote '${REMOTE_NAME}' does not exist"
    echo "Available remotes:"
    git remote
    exit 1
fi

# Calculate the date one week ago in seconds since epoch (compatible with both Linux and macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    ONE_WEEK_AGO=$(date -v-7d +%s)
else
    # Linux
    ONE_WEEK_AGO=$(date -d "1 week ago" +%s)
fi

# Fetch all remote branches and prune deleted ones
git fetch --prune

echo "Checking branches merged into ${REMOTE_NAME}/${TARGET_BRANCH}..."

# Get list of all remote branches except main, master, develop, and target branch
for branch in $(git branch -r | grep "^  ${REMOTE_NAME}/" | grep -v -E "main|master|develop|${TARGET_BRANCH}" | sed "s/${REMOTE_NAME}\///g"); do
    # Get the last commit timestamp for the branch
    LAST_COMMIT_TIMESTAMP=$(git log -1 --format=%ct "${REMOTE_NAME}/${branch}")
    
    # Check if branch is older than one week
    if [ $LAST_COMMIT_TIMESTAMP -lt $ONE_WEEK_AGO ]; then
        # Check if the branch is fully merged into target branch
        if git branch -r --merged "${REMOTE_NAME}/${TARGET_BRANCH}" | grep -q "${REMOTE_NAME}/${branch}"; then
            echo "Branch ${branch} is merged into ${TARGET_BRANCH} and older than a week. Deleting..."
            # Delete the remote branch
            git push ${REMOTE_NAME} --delete "${branch}"
        else
            echo "Branch ${branch} is not merged into ${TARGET_BRANCH}. Skipping..."
        fi
    else
        echo "Branch ${branch} has been updated within the last week. Skipping..."
    fi
done
