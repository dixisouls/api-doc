import os
import json
import zipfile
import tempfile
from typing import Dict, Any
from pathlib import Path

async def create_zip_file(documentation: Dict[str, Any], temp_dir: str) -> str:
    """
    Create a ZIP file containing API documentation in both JSON and HTML formats
    
    Args:
        documentation: The API documentation data
        temp_dir: Directory to store temporary files
        
    Returns:
        Path to the created ZIP file
    """
    # Create file paths
    json_path = os.path.join(temp_dir, "api-documentation.json")
    html_path = os.path.join(temp_dir, "api-documentation.html")
    zip_path = os.path.join(temp_dir, "api-documentation.zip")
    
    # Write JSON file
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(documentation, f, indent=2)
    
    # Get HTML template path
    template_path = Path(__file__).parent.parent / "templates" / "api-docs-template.html"
    
    # Read HTML template
    with open(template_path, "r", encoding="utf-8") as f:
        html_template = f.read()
    
    # Find the sample data section in the template
    start_marker = 'const apiData = ['
    end_marker = '];'
    start_index = html_template.find(start_marker)
    end_index = html_template.find(end_marker, start_index) + len(end_marker)
    
    # Replace the sample data with actual documentation
    if start_index >= 0 and end_index > start_index:
        html_content = (
            html_template[:start_index] +
            f'const apiData = {json.dumps(documentation, indent=2)};' +
            html_template[end_index:]
        )
    else:
        # Fallback to simple replacement if pattern not found
        html_content = html_template.replace(
            'const apiData = [',
            f'const apiData = {json.dumps(documentation, indent=2)};'
        )
    
    # Write HTML file
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    # Create ZIP file
    with zipfile.ZipFile(zip_path, "w") as zipf:
        zipf.write(json_path, arcname=os.path.basename(json_path))
        zipf.write(html_path, arcname=os.path.basename(html_path))
    
    # Clean up temporary files
    os.remove(json_path)
    os.remove(html_path)
    
    return zip_path