import re
from datetime import datetime

def validate_name(name):
    # Allow letters, single hyphen or apostrophe between letters, but not consecutive symbols
    if not re.fullmatch(r"[A-Za-z]+([-' ][A-Za-z]+)*", name):
        return False, "Invalid name: Only letters, single hyphens, or apostrophes allowed (not consecutive)"
    return True, None

def validate_date_of_birth(date_of_birth):
    try:
        dob = datetime.strptime(date_of_birth, "%Y-%m-%d")
        if dob > datetime.now():
            return False, "Date of birth cannot be in the future"
        return True, None
    except ValueError:
        return False, "Invalid date format (use YYYY-MM-DD)"