from .file_operations import read_records, write_records

def create_record(first_name, last_name, date_of_birth):
    records = read_records()
    records.append({"First Name": first_name, "Last Name": last_name, "Date of Birth": date_of_birth})
    write_records(records)
    return {"message": "Record created successfully"}