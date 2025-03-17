import os
import pandas as pd

def ensure_csv_exists(filename="students.csv"):
    if not os.path.exists(filename):
        df = pd.DataFrame(columns=["First Name", "Last Name", "Date of Birth"])
        df.to_csv(filename, index=False)

def read_records(filename="students.csv"):
    ensure_csv_exists(filename)
    df = pd.read_csv(filename)
    return df.to_dict(orient='records')

def write_records(records, filename="students.csv"):
    df = pd.DataFrame(records)
    df.to_csv(filename, index=False)