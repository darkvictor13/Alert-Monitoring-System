extern crate jsonwebtoken as jwt;
extern crate reqwest;

use jwt::{encode, Header};
use serde_json::json;
use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    // Chave secreta para assinar o token
    let secret = "JifzKcSBjMvwP4P+vYtOWP1AWfVvwZQlcYgY2wWMrzhbDQmj4Hp6kkdM+axE4qQbtsHCcsCVkJzAnT4f1vrT+WVqRgwOdFpM88HJAuGNf7ZKA+cBb638Jfx4/d3qlk9MasclpKbwHflPRj4jhFxZu7lju8pihq22biqfBREAHqBH7rnxLV/vO8WuM5a/Uu/FAhWvhuFnI8ycrsNV6G0dWb4oymQIUpqAxgdb7OmvTXCGAwsLyDkDaEyRA9E4pLybNrjsUyaj8zaDFOWuwmOP7aqtFGYfBblnirFJqD2TtD0FJDgZmceMzycr9JGn9dnt1+3BDnD1cd9tQ0Sax+3dCw==";
    let encoding_key = jwt::EncodingKey::from_base64_secret(secret.as_ref()).unwrap();
    let claims = json!({ "hello": "world", "iat": iat() });

    // Assinar o token
    let token = encode(&Header::default(), &claims, &encoding_key).unwrap();
    println!("Token: {}", token);

    // Fazer uma solicitação HTTP ao backend
    let client = reqwest::blocking::Client::new();
    let res = client
        .get("http://localhost:4000/api/device")
        .header("device_token", token)
        .send()
        .unwrap();

    println!("Status: {}", res.status());
    println!("Body: {}", res.text().unwrap());
}

fn iat() -> u64 {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    since_the_epoch.as_secs()
}
