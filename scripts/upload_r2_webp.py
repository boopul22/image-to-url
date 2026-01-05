
import boto3
import os
from PIL import Image
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration from environment variables
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID")
R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME")
R2_PUBLIC_URL = os.getenv("R2_PUBLIC_URL")

# Validate required environment variables
required_vars = {
    "R2_ACCESS_KEY_ID": R2_ACCESS_KEY_ID,
    "R2_SECRET_ACCESS_KEY": R2_SECRET_ACCESS_KEY,
    "R2_ACCOUNT_ID": R2_ACCOUNT_ID,
    "R2_BUCKET_NAME": R2_BUCKET_NAME,
    "R2_PUBLIC_URL": R2_PUBLIC_URL,
}

missing_vars = [var for var, value in required_vars.items() if not value]
if missing_vars:
    raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

ENDPOINT_URL = f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

s3 = boto3.client(
    "s3",
    endpoint_url=ENDPOINT_URL,
    aws_access_key_id=R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2_SECRET_ACCESS_KEY,
)

ARTIFACT_DIR = "/Users/bipulkumar/.gemini/antigravity/brain/6b112676-293c-4307-9bb6-ee19abe5800f"

# Mapping: original_filename_part -> new_filename_base
images_to_upload = [
    {
        "search": "bulk_upload_featured",
        "new_name": "blog-bulk-upload-featured.webp"
    },
    {
        "search": "bulk_upload_steps",
        "new_name": "blog-bulk-upload-steps.webp"
    },
    {
        "search": "bulk_upload_usecases",
        "new_name": "blog-bulk-upload-usecases.webp"
    },
    {
        "search": "bulk_upload_comparison",
        "new_name": "blog-bulk-upload-comparison.webp"
    }
]

print("Starting WebP conversion and upload...")

# Find files
files = os.listdir(ARTIFACT_DIR)

for img_map in images_to_upload:
    found_file = None
    for f in files:
        if img_map["search"] in f and f.endswith(".png"):
            found_file = f
            break
    
    if found_file:
        file_path = os.path.join(ARTIFACT_DIR, found_file)
        new_name = img_map["new_name"]
        
        print(f"Processing {found_file}...")
        
        try:
            # Open image
            with Image.open(file_path) as img:
                # Save as WebP in memory or tmp file
                webp_path = file_path.replace(".png", ".webp")
                img.save(webp_path, "WEBP", quality=85)
                
            print(f"Converted to {webp_path}")

            # Upload WebP
            print(f"Uploading {new_name}...")
            with open(webp_path, "rb") as f:
                s3.upload_fileobj(
                    f, 
                    R2_BUCKET_NAME, 
                    new_name,
                    ExtraArgs={'ContentType': "image/webp"}
                )
            print(f"Success! URL: {R2_PUBLIC_URL}/{new_name}")
            
            # Clean up local webp (optional)
            os.remove(webp_path)
            
        except Exception as e:
            print(f"Failed to process/upload {found_file}: {e}")
    else:
        print(f"Could not find file matching {img_map['search']}")

print("Done.")
