import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Fake EMS data
data = {
    "age": [72, 45, 16, 30, 84, 22, 55, 67, 10, 39, 76, 50, 28, 61, 19, 90, 34, 47, 12, 69],
    "breathing_problem": [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    "chest_pain": [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    "bleeding": [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    "unconsciousness": [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    "seizure": [0]*20,
    "allergic_reaction": [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    "heart_rate": [130, 88, 75, 105, 140, 95, 120, 132, 100, 82, 136, 110, 98, 125, 90, 145, 102, 128, 92, 138],
    "blood_pressure": [180, 120, 110, 130, 190, 118, 160, 175, 115, 122, 185, 135, 125, 170, 118, 195, 128, 165, 116, 188],
    "oxygen_level": [82, 97, 99, 91, 80, 96, 88, 84, 98, 99, 83, 95, 92, 87, 97, 79, 93, 86, 98, 81],
    "pain_level": [9, 6, 2, 5, 10, 7, 8, 9, 4, 3, 10, 6, 4, 8, 3, 10, 5, 8, 4, 9],
    "distance_to_hospital": [15, 8, 5, 12, 20, 7, 10, 18, 6, 9, 16, 11, 8, 14, 5, 22, 9, 13, 6, 17],
    "time_of_day": [2, 14, 10, 19, 1, 16, 21, 3, 11, 13, 0, 15, 18, 22, 9, 4, 20, 23, 12, 5],
    "previous_conditions": [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    "urgency_level": [
        "High", "Medium", "Low", "Medium", "High",
        "Medium", "High", "High", "Medium", "Low",
        "High", "Medium", "Medium", "High", "Low",
        "High", "Medium", "High", "Medium", "High"
    ]
}

# Make a DataFrame
df = pd.DataFrame(data)

# Split data into inputs and answers
X = df.drop("urgency_level", axis=1)
y = df["urgency_level"]

# Split into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42
)

# Create the model
model = DecisionTreeClassifier(random_state=42)

# Train the model
model.fit(X_train, y_train)

# Test the model
predictions = model.predict(X_test)

# Check accuracy
accuracy = accuracy_score(y_test, predictions)

print("EMS Urgency Predictor")
print("---------------------")
print("Model Accuracy:", accuracy)

# Show predictions
results = pd.DataFrame({
    "Actual Urgency": y_test,
    "Predicted Urgency": predictions
})

print("\nTesting Results:")
print(results)

# New patient example
new_patient = pd.DataFrame({
    "age": [68],
    "breathing_problem": [1],
    "chest_pain": [1],
    "bleeding": [0],
    "unconsciousness": [0],
    "seizure": [0],
    "allergic_reaction": [0],
    "heart_rate": [128],
    "blood_pressure": [170],
    "oxygen_level": [86],
    "pain_level": [8],
    "distance_to_hospital": [12],
    "time_of_day": [21],
    "previous_conditions": [1]
})

# Predict new patient urgency
new_prediction = model.predict(new_patient)

print("\nNew Patient Prediction:")
print("Predicted Urgency Level:", new_prediction[0])
