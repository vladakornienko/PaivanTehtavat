import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const today = new Date().toLocaleDateString('fi-Fi', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const addTask = () => {
    const newTask = task.trim();

    if (newTask === '') {
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, newItem]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Päivän tehtävät</Text>
      <Text style={styles.date}>{today}</Text>

      <TextInput
        style={styles.input}
        placeholder="Kirjoita uusi tehtävä..."
        value={task}
        onChangeText={setTask}
        onSubmitEditing={addTask}
      />

      <Button title="Lisää tehtävä" onPress={addTask} />

      <Text style={styles.heading}>Tehtävälista</Text>

      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Ei tehtäviä vielä</Text>
        }
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Pressable style={styles.taskContent} onPress={() => toggleTask(item.id)}>
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedTask,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>Poista</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8a2b5',
    padding: 24,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0f0f0f',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  taskContent: {
    flex: 1,
    paddingRight: 8,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    color: '#777777',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: '#cc3333',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  empty: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 20,
  },

});
