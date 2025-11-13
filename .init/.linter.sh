#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-to-do-list-manager-224096/todo_list_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

