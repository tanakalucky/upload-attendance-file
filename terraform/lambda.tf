data "archive_file" "upload-attendance-file" {
  type        = "zip"
  source_dir  = "../dist"
  output_path = "../upload-attendance-file.zip"
}

resource "aws_lambda_function" "upload-attendance-file" {
  function_name    = "upload-attendance-file"
  filename         = data.archive_file.upload-attendance-file.output_path
  source_code_hash = data.archive_file.upload-attendance-file.output_base64sha256
  runtime          = "nodejs20.x"
  role             = aws_iam_role.lambda_iam_role.arn
  handler          = "index.handler"
}
