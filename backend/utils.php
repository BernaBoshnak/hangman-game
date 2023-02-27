<?php
function httpResponse(int $statusCode, bool $isOk, array $params)
{
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($statusCode);
    $responseArray = array_merge(['ok' => $isOk], $params);

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
?>