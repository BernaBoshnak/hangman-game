<?php
// error_reporting(0); // disable errors on prod
error_reporting(-1); // enable errors on dev
header('Access-Control-Allow-Origin: *');

include_once 'utils.php';

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
$json = file_get_contents('nounlist.json');
$jsonData = json_decode($json, true);

$filteredData = $jsonData;
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