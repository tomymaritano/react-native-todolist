import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Keyboard, Alert} from 'react-native';

// Importa la interfaz Task si está definida en otro archivo
import { Task } from './models/models';

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim().length === 0) return;
    
    const newTask: Task = { id: Date.now().toString(), value: task };
    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTask('');
    Keyboard.dismiss(); // Cierra el teclado después de agregar una tarea
  };

  const editTask = (id: string, newValue: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task => 
        task.id === id ? { ...task, value: newValue } : task
      )
    );
  };
  const promptForEdit = (id: string, oldValue: string) => {
    Alert.prompt(
      'Editar tarea',
      'Ingresa el nuevo valor de la tarea',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: (newValue) => editTask(id, newValue),
        },
      ],
      'plain-text',
      oldValue
    );
  };

  
  const deleteTask = (id: string) => {
    setTasks(currentTasks => 
      currentTasks.filter(task => task.id !== id)
    );
  };
  
  const archiveTask = (id: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task => 
        task.id === id ? { ...task, isArchived: true } : task
      )
    );
  };
  

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Agregar nueva tarea"
          style={styles.input}
          onChangeText={text => setTask(text)}
          value={task}
        />
        <Button title="AÑADIR" onPress={addTask} />
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});


export default App;
