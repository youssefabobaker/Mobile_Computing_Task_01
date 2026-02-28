import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// تعريف شكل البيانات للمهمة (Type Definition)
interface TaskItem {
  id: string;
  text: string;
  isDone: boolean;
}

export default function TodoAssignment() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskItem[]>([]);

  // إضافة مهمة
  const handleAdd = () => {
    if (task.trim().length > 0) {
      const newTask: TaskItem = {
        id: Date.now().toString(),
        text: task,
        isDone: false,
      };
      setTaskList([...taskList, newTask]);
      setTask("");
      Keyboard.dismiss();
    }
  };

  // حذف مهمة
  const handleDelete = (id: string) => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  // تغيير الحالة (تمت أو لأ)
  const toggleStatus = (id: string) => {
    setTaskList(
      taskList.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>My Tasks</Text>
        <Text style={styles.dateText}>{new Date().toDateString()}</Text>
      </View>

      {/* Tasks List */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.taskTextContainer}
              onPress={() => toggleStatus(item.id)}
            >
              <View
                style={[
                  styles.checkCircle,
                  item.isDone && styles.checkedCircle,
                ]}
              />
              <Text
                style={[styles.taskText, item.isDone && styles.completedText]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputArea}
      >
        <TextInput
          style={styles.textInput}
          placeholder={"Add a new task..."}
          placeholderTextColor={"#999"}
          value={task}
          onChangeText={(val: string) => setTask(val)}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Dark Navy Blue
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#F8FAFC",
    letterSpacing: -1,
  },
  dateText: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  taskTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#38BDF8", // Light Blue
    marginRight: 12,
  },
  checkedCircle: {
    backgroundColor: "#38BDF8",
  },
  taskText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#64748B",
  },
  deleteIcon: {
    color: "#EF4444",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  inputArea: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: "#F8FAFC",
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  addBtn: {
    width: 55,
    height: 55,
    backgroundColor: "#38BDF8",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#38BDF8",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  addBtnText: {
    fontSize: 30,
    color: "#0F172A",
    fontWeight: "bold",
  },
});
