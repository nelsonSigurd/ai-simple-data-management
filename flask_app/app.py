# simple-data-management/flask_app/app.py
from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)
app.secret_key = "supersecretkey"

# Define backend API URL directly
BACKEND_URL = "http://127.0.0.1:5000"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/records")
def view_records():
    response = requests.get(f"{BACKEND_URL}/api/records")
    if response.status_code == 200:
        records = response.json().get("records", [])
    else:
        flash("Failed to fetch records. Please try again.", "danger")
        records = []
    return render_template("records.html", records=records)

@app.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        data = {
            "first_name": request.form["first_name"],
            "last_name": request.form["last_name"],
            "date_of_birth": request.form["date_of_birth"]
        }
        response = requests.post(f"{BACKEND_URL}/api/create", data=data)
        if response.status_code == 201:
            flash("Record created successfully!", "success")
        else:
            flash(response.json().get("error", "Failed to create record."), "danger")
        return redirect(url_for("view_records"))
    return render_template("create.html")

@app.route("/delete", methods=["POST"])
def delete():
    record_id = request.form["record_id"]
    response = requests.post(f"{BACKEND_URL}/api/delete", data={"record_id": record_id})
    if response.status_code == 200:
        flash("Record deleted successfully!", "success")
    else:
        flash(response.json().get("error", "Failed to delete record."), "danger")
    return redirect(url_for("view_records"))

@app.route("/update", methods=["POST"])
def update_record_route():
    data = {
        "record_id": request.form["record_id"],
        "first_name": request.form["first_name"],
        "last_name": request.form["last_name"],
        "date_of_birth": request.form["date_of_birth"]
    }
    response = requests.post(f"{BACKEND_URL}/api/update", data=data)
    if response.status_code == 200:
        flash("Record updated successfully!", "success")
    else:
        flash(response.json().get("error", "Failed to update record."), "danger")
    return redirect(url_for("view_records"))

if __name__ == "__main__":
    app.run(debug=True, port=5001)
