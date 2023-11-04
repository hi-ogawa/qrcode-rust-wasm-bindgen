use wasm_bindgen::{prelude::wasm_bindgen, JsError};

#[wasm_bindgen]
pub fn qrcode_encode(data: &[u8]) -> Result<Box<[u8]>, JsError> {
    let code = qrcode::QrCode::new(data)?;
    let colors = code.to_colors();
    let bins: Vec<u8> = colors
        .iter()
        .map(|&c| match c {
            qrcode::types::Color::Light => 0,
            qrcode::types::Color::Dark => 1,
        })
        .collect();
    Ok(bins.into_boxed_slice())
}
