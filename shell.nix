{ pkgs ? import <nixpkgs> {} }: with pkgs; mkShell {
  buildInputs = with python3Packages;
    [ python ];
  nativeBuildInputs = with python3Packages;
    [ black colorama flake8 isort ];
}
