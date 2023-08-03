# -*- coding: utf-8 -*-
"""
Created on Wed Aug  2 20:42:35 2023

@author: User
"""

import os
import re

def rename_images(directory='.'):
    allnames = set()
    for filename in os.listdir(directory):
        filename.replace('Cropped', '')
        if not '_' in filename:
            namearr = filename.split('.')
            if 'jpg' in namearr or 'png' in namearr:
                if not namearr[0].isalpha():
                    finalname = namearr[0][0:len(namearr[0]) - 1] + '_' + namearr[0][-1] + '.jpg'
                else:
                    finalname = namearr[0] + '_1' + '.jpg'
                #os.rename(filename, finalname)
        else:
            finalname = filename.replace("Cropped", '')
            finalname = finalname.replace(".png", ".jpg")
        print(finalname)
        try:
            os.rename(filename, finalname)
        except:
            print("Trying to rename" + filename + " to " + finalname)
            continue
        allnames.add(finalname.split('_')[0])
    print(allnames)
# Usage example:
# Rename image files in the current directory
rename_images()