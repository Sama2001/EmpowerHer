import { StyleSheet } from 'react-native';

export const firstPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    // Styles for content container
  },
  profileButton: {
    position: 'absolute',
    top: 70,
    left: 5,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderColor: '#a86556',
    width: 150,
    zIndex: 2,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  menuIconContainer: {
    position: 'absolute',
    top: 10,
    left: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  menuContainer: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  menuItemText: {
    fontSize: 16,
    // Other styles for menu item text
  },
});