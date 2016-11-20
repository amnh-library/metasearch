#!/bin/bash

case $1 in
    api)
        git subtree push --prefix server api master ;;
    *)
        git subtree push --prefix library-metasearch heroku master ;;
esac