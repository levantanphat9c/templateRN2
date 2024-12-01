import { getStylesHook } from '@/Hooks';

export default getStylesHook(dynamicColors => {
  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: dynamicColors.UI.tableHeader,
      width: 68,
      borderRadius: 21,
      marginLeft: 10,
    },
    itemSelected: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: dynamicColors.Main.mainPurple,
      width: 68,
      borderRadius: 21,
      marginLeft: 10,
    },
  };
});
