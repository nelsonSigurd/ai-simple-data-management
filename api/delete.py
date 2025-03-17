from .file_operations import read_records, write_records

def delete_record(record_id):
    records = read_records()
    if 0 <= record_id < len(records):
        records.pop(record_id)
        write_records(records)
        return {"message": "Record deleted successfully"}
    return {"error": "Invalid record ID"}