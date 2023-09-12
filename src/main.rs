#![allow(non_snake_case)]
// import the prelude to get access to the `rsx!` macro and the `Scope` and `Element` types
use dioxus::prelude::*;

fn main() {
    // launch the web app
    dioxus_web::launch(App);
}

// create a component that renders a div with the text "Hello, world!"
fn App(cx: Scope) -> Element {


    let field = (0..81).into_iter().map(|_| {rsx!{
        div {
            class: "cell_draft_container",
            (0..9).into_iter().map(|i| {rsx!{
                div {
                    (i+1).to_string()
                },
            }})
        },
    }});

    cx.render(rsx! {
        style {  include_str!("../src/app.css")  },
        div {
            class: "field",
        field
    }
    })
}
