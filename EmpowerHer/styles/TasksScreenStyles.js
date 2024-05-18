// styles/TasksScreenStyles.js

import { StyleSheet } from 'react-native';

export const tasksScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDeadline: {
    fontSize: 14,
    color: '#ff0000',
    marginTop: 5,
  },

  taskDescription: {
    fontSize: 14,
    color: '#666',
    margin:100,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },

  progressInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  updateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});
