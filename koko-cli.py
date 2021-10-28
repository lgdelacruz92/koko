#!/usr/local/bin/python3
import os
import argparse
import json

parser = argparse.ArgumentParser(description='Adds a component to project')
parser.add_argument('-n', '--name', help='Name of component (dash-case)')
parser.add_argument('--tests', action='store_true', help='Run tests')
args = parser.parse_args()

def tests():
    test_validate()
    test_dash_case_to_camel_case()

def raisesError(test, *param):
    try:
        test(param)
    except BaseException as b:
        return True
    raise Exception(f'Expected to raise and error but didn\'t.')

def test_validate():
    assert raisesError(validate, '-adfa')
    assert raisesError(validate, 'adfa-')

def test_dash_case_to_camel_case():
    assert dash_case_to_camel_case('name-name') == 'NameName'
    assert dash_case_to_camel_case('koko') == 'Koko'
    assert dash_case_to_camel_case('koko-name-dfaf-adsfa') == 'KokoNameDfafAdsfa'

def dash_case_to_camel_case(name):
    clean_name = name.replace('\n','')
    tokens = name.split('-')
    component_name = ''
    for token in tokens:
        component_name += token.capitalize()
    return component_name

def validate(name):
    if len(name) == 0:
        raise InvalidComponentName()

    if name[0] == '-' or name[-1] == '-':
        raise InvalidComponentName()

    valid_chars = set([chr(i) for i in range(97,123)]) # small case letters
    valid_chars.add('-') # add dash
    for c in name:
        if c not in valid_chars:
            raise InvalidComponentName()

class NotKokoProjectException(Exception):
    def __str__(self):
        return f'Cannot use koko-cli on non koko react project.'

class InvalidComponentName(Exception):
    def __str__(self):
        return f'names are only allowed to be small case alphabetical characters and dash but no dash on beginning or end of the name'

def main():
    try:
        validate(args.name)
        proj_json_file = open('./.proj.json', 'r')
        proj_json = json.load(proj_json_file)
        if proj_json['name'] != 'koko react app':
            raise NotKokoProjectException()
        os.system(f'mkdir src/{args.name}')
        camel_case_name = dash_case_to_camel_case(args.name)
        start_code = [
            f'import \'./{args.name}.css\';\n',
            f'export default function {camel_case_name}() ' + '{\n',
            '}\n'
        ]
        start_code_str = ''.join(start_code)
        os.system(f'echo "{start_code_str}" > src/{args.name}/{camel_case_name}.jsx')
        os.system(f'touch src/{args.name}/{args.name}.css')
    except Exception as e:
        raise NotKokoProjectException()

if __name__ == '__main__':
    if args.tests:
        tests()
    else:
        main()
