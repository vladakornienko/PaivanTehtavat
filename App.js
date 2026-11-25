import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loadingFinished, setLoadingFinished] = useState(false);

  const [todayKey] = useState(() => new Date().toDateString());

  const today = new Date().toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('paivanTehtavat');

        if (jsonValue !== null) {
          const savedData = JSON.parse(jsonValue);

          if (savedData.date === todayKey) {
            setTasks(savedData.tasks);
          } else {
            setTasks([]);
          }
        }
      } catch (e) {
        console.log('Virhe tehtävien lataamisessa:', e);
      } finally {
        setLoadingFinished(true);
      }
    };

    loadTasks();
  }, [todayKey]);

  useEffect(() => {
    const saveTasks = async () => {
      if (!loadingFinished) {
        return;
      }

      try {
        const jsonValue = JSON.stringify({
          date: todayKey,
          tasks: tasks,
        });

        await AsyncStorage.setItem('paivanTehtavat', jsonValue);
      } catch (e) {
        console.log('Virhe tehtävien tallentamisessa:', e);
      }
    };

    saveTasks();
  }, [tasks, loadingFinished, todayKey]);

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

  const speakUnfinishedTasks = () => {
    const unfinishedTasks = tasks.filter((item) => !item.completed);

    if (unfinishedTasks.length === 0) {
      Speech.speak('Ei keskeneräisiä tehtäviä', {
        language: 'fi-FI',
      });
      return;
    }

    const taskText = unfinishedTasks.map((item) => item.title).join('. ');

    Speech.speak(taskText, {
      language: 'fi-FI',
    });

  };

  if (!loadingFinished) {
    return (
      <View style={styles.container}>
        <Text>Ladataan tehtäviä...</Text>
      </View>
    );
  }


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

      <View style={styles.speechButton}>
        <Button
          title="Lue keskeneräiset tehtävät"
          onPress={speakUnfinishedTasks} />
      </View>

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
    backgroundColor: '#eeee94',
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

  speechButton: {
    marginTop: 12,
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
