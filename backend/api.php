<?php
// error_reporting(0); // disable errors on prod
error_reporting(-1); // enable errors on dev
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

function httpResponse(int $statusCode, bool $isOk, array ...$params)
{
    http_response_code($statusCode);
    $responseArray = ['ok' => $isOk, ...$params];

    echo json_encode($responseArray);
    exit;
}

function isInteger($input)
{
    return (ctype_digit(strval($input)));
}

/**
 * @param array $dataArr
 * @param int|string|null $filter
 * @param callable $arrayFiltersCallback
 * @return array
 */

function filterBy($dataArr, $filter, $arrayFiltersCallback)
{
    if ($filter === null) {
        return $dataArr;
    }

    return array_filter($dataArr, $arrayFiltersCallback);
}

function validateParamKeys()
{
    $validKeys = ['minLength', 'maxLength', 'startsWith', 'endsWith', 'contains'];
    $requestParams = array_keys($_GET);
    $invalidParams = array_diff($requestParams, $validKeys);

    if (count($invalidParams)) {
        httpResponse(400, false, ['message' => 'Invalid query params!', 'parameters' => $invalidParams]);
    }
}

function validateParamValues($paramName, $type, &$errors)
{
    if (!isset($_GET[$paramName])) {
        return null;
    }

    $value = $_GET[$paramName];

    if (empty($value)) {
        $errors[$paramName] = 'empty value';
        return null;
    }

    if ($type === 'integer') {
        if (isInteger($value)) {
            return (int) $value;
        }

        $errors[$paramName] = 'integer expected';
        return null;
    }

    if ($type === 'string') {
        if (ctype_alpha($value)) {
            return $value;
        }

        $errors[$paramName] = 'string expected';
        return null;
    }

    return null;
}

// Validate query params - stop execution and return wrong keys
validateParamKeys();

$errors = [];
$minLength = validateParamValues('minLength', 'integer', $errors);
$maxLength = validateParamValues('maxLength', 'integer', $errors);
$startsWith = validateParamValues('startsWith', 'string', $errors);
$endsWith = validateParamValues('endsWith', 'string', $errors);
$contains = validateParamValues('contains', 'string', $errors);

if (count($errors)) {
    httpResponse(400, false, ['message' => 'Invalid field!', 'fields' => $errors]);
}

// Load the noun list
const WORDS_STR = file_get_contents('nounlist.json');
const WORDS = json_decode(WORDS_STR, true);

$filteredData = WORDS;
$filteredData = filterBy($filteredData, $minLength, fn($v) => strlen($v) >= $minLength);
$filteredData = filterBy($filteredData, $maxLength, fn($v) => strlen($v) <= $maxLength);
$filteredData = filterBy($filteredData, $startsWith, fn($v) => strpos($v, $startsWith) === 0);
$filteredData = filterBy($filteredData, $endsWith, fn($v) => substr($v, -strlen($endsWith)) === $endsWith);
$filteredData = filterBy($filteredData, $contains, fn($v) => strpos($v, $contains) !== false);

if (!count($filteredData)) {
    httpResponse(200, true, ['word' => null]);
}

$filteredData = array_values($filteredData);
$randomIndex = rand(0, count($filteredData) - 1);
$randomWord = $filteredData[$randomIndex];

httpResponse(200, true, ['word' => $randomWord]);
?>