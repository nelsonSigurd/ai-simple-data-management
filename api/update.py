from .file_operations import read_records, write_records

def update_record(record_id, first_name, last_name, date_of_birth):
    records = read_records()
    if 0 <= record_id < len(records):
        records[record_id] = {"First Name": first_name, "Last Name": last_name, "Date of Birth": date_of_birth}
        write_records(records)
        return {"message": "Record updated successfully"}
    return {"error": "Invalid record ID"}