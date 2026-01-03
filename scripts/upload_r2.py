
import boto3
import os
import mimetypes

# Configuration
R2_ACCESS_KEY_ID = "4320a1be88c601209a8fef734cc436c8"
R2_SECRET_ACCESS_KEY = "99fa05fff19ff66f44d7857e97af898234c129013282d13b87f5de81cd593ea9"
R2_ACCOUNT_ID = "ab54ca2d01df4886aa0c3f240ace806d"
R2_BUCKET_NAME = "imgtourl"
R2_PUBLIC_URL = "https://imagetourl.cloud"

ENDPOINT_URL = f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

s3 = boto3.client(
    "s3",
    endpoint_url=ENDPOINT_URL,
    aws_access_key_id=R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2_SECRET_ACCESS_KEY,
)

ARTIFACT_DIR = "/Users/bipulkumar/.gemini/antigravity/brain/d7967891-24ba-4b47-941e-76cf79d43f92"

# Mapping: original_filename_part -> new_filename
images_to_upload = [
    {
        "search": "image_copyright_infographic",
        "new_name": "infographic-copyright-fair-use.png"
    },
    {
        "search": "web_performance_infographic",
        "new_name": "infographic-image-optimization.png"
    },
    {
        "search": "reverse_image_search_infographic",
        "new_name": "infographic-reverse-image-search.png"
    },
    {
        "search": "social_media_sizes_infographic",
        "new_name": "infographic-social-media-sizes.png"
    },
    {
        "search": "image_file_formats_infographic",
        "new_name": "infographic-file-formats.png"
    }
]

print("Starting upload...")

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
        
        print(f"Uploading {found_file} as {new_name}...")
        
        try:
            with open(file_path, "rb") as f:
                s3.upload_fileobj(
                    f, 
                    R2_BUCKET_NAME, 
                    new_name,
                    ExtraArgs={'ContentType': "image/png"}
                )
            print(f"Success! URL: {R2_PUBLIC_URL}/{new_name}")
        except Exception as e:
            print(f"Failed to upload {found_file}: {e}")
    else:
        print(f"Could not find file matching {img_map['search']}")

print("Done.")
