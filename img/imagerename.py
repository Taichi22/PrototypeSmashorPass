# -*- coding: utf-8 -*-
"""
Created on Wed Aug  2 20:42:35 2023

@author: User
"""

import os
import re

def rename_images(directory='.'):
    for filename in os.listdir(directory):
        name, ext = os.path.splitext(filename)
        match = re.match(r'(\D+)(\d+)$', name)
        if match:
            name_with_underscore = match.group(1) + '_' + match.group(2)
            new_name = name_with_underscore + ext
            os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))
            print(f"Renamed {filename} to {new_name}")

# Usage example:
# Rename image files in the current directory
rename_images()