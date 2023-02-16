<?php
// error_reporting(0);    // disable errors on prod
error_reporting(-1); // enable errors on dev
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

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
        http_response_code(400);
        echo json_encode(['message' => 'Invalid query params!', 'parameters' => $invalidParams, 'ok' => false]);
        exit;
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
    http_response_code(400);
    echo json_encode(['message' => 'Invalid field!', 'fields' => $errors, 'ok' => false]);
    exit;
}

// Load the noun list
$json = file_get_contents('nounlist.json');
$jsonData = json_decode($json, true);

$filteredData = $jsonData;
$filteredData = filterBy($filteredData, $minLength, fn($v) => strlen($v) >= $minLength);
$filteredData = filterBy($filteredData, $maxLength, fn($v) => strlen($v) <= $maxLength);
$filteredData = filterBy($filteredData, $startsWith, fn($v) => strpos($v, $startsWith) === 0);
$filteredData = filterBy($filteredData, $endsWith, fn($v) => substr($v, -strlen($endsWith)) === $endsWith);
$filteredData = filterBy($filteredData, $contains, fn($v) => strpos($v, $contains) !== false);

if (!count($filteredData)) {
    http_response_code(200);
    echo json_encode(['word' => null, 'ok' => true]);
    exit;
}

$filteredData = array_values($filteredData);
$randomIndex = rand(0, count($filteredData) - 1);
$randomWord = $filteredData[$randomIndex];

http_response_code(200);
echo json_encode(['word' => $randomWord, 'ok' => true]);
?>