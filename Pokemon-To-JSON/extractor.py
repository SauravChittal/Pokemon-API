from copy import Error
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

import json

import time

opti = Options()
opti.headless = False

driver = webdriver.Chrome(ChromeDriverManager().install(), port=0, options=opti)

def get_info(pokemon):
    # What we return
    thingToReturn = []
    pokemon.upper()
    pokemon.replace(" ", "_")
    pokemon.title()
    driver.get("https://bulbapedia.bulbagarden.net/wiki/{0}_(Pok%C3%A9mon)".format(pokemon))
    # Type of Pokemon. For eg Bulbasaur is "Seed Pokemon"
    thingToReturn.append(driver.find_element_by_css_selector(".mw-parser-output > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(3)").text)
    # Type of Pokemon
    type = driver.find_element_by_css_selector(".mw-parser-output > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)").text
    second = ""
    try:
        # Second type
        second = driver.find_element_by_css_selector(".mw-parser-output > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)").text
        if second == None or second == "???":
            raise Error
    except:
        second = ""
    type += second
    thingToReturn.append(type)
    return thingToReturn

def valid_pokemon(pokemon_name):
    some = open("all_pokemon.txt", "r")
    all_str = some.read().replace(" ", "-").upper().split(",")
    pokemon_name = str(pokemon_name.upper())

    if pokemon_name.__contains__("-"):
        till = pokemon_name.find("-")
        print(pokemon_name[till:])
        if pokemon_name.__contains__("GALAR") or pokemon_name.__contains__("ALOLA"):
            return False

    print(pokemon_name, (pokemon_name in all_str), sep=" ")
    if pokemon_name in all_str:
        return True
    else:
        return False

all_names = open("all_pokemon.txt", "r")
all_str = all_names.read().replace(" ", "-").split(",")
list = {}
for i in all_str:
    try:
        list[i] = get_info(i)
        time.sleep(2)
    except Exception as e:
        print(e)
        print(" The Pokemon is " + i)
print(list)

json_file = open("json.txt", "w")
json_file.write(json.dumps(list))
