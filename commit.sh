#!/bin/bash
git add .
read -p "commit name:" com
git commit -m $com
echo 'done!' 