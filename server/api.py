from flask import Flask, request, jsonify
from api.create import create_record
from api.retrieve import get_all_records
from api.update import update_record
from api.delete import delete_record
from flask_app.validators import validate_name, validate_date_of_birth

app = Flask(__name__)

@app.route("/api/records", methods=["GET"])
def get_records():
    try:
        records = get_all_records()
        return jsonify({"success": True, "records": records}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
 
@app.route("/api/create", methods=["POST"])
def create_record_route():
    data = request.form
    valid_first, error_first = validate_name(data.get("first_name", ""))
    valid_last, error_last = validate_name(data.get("last_name", ""))
    valid_dob, error_dob = validate_date_of_birth(data.get("date_of_birth", ""))
    
    if not (valid_first and valid_last and valid_dob):
        return jsonify({"success": False, "error": error_first or error_last or error_dob}), 400
    
    try:
        create_record(data["first_name"], data["last_name"], data["date_of_birth"])
        return jsonify({"success": True, "message": "Record created successfully"}), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/update", methods=["POST"])
def api_update_record():
    data = request.form
    try:
        update_result = update_record(int(data["record_id"]), data["first_name"], data["last_name"], data["date_of_birth"])
        return jsonify({"success": True, "message": update_result}), 200
    except ValueError:
        return jsonify({"success": False, "error": "Invalid record ID"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/delete", methods=["POST"])
def delete_record_route():
    data = request.form
    try:
        delete_result = delete_record(int(data["record_id"]))
        return jsonify({"success": True, "message": delete_result}), 200
    except ValueError:
        return jsonify({"success": False, "error": "Invalid record ID"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)