#!/bin/bash

mongoimport --drop --db $1 --collection accounts --file ../../db/accounts.json

