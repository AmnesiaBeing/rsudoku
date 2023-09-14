#![allow(non_snake_case)]
// import the prelude to get access to the `rsx!` macro and the `Scope` and `Element` types
use dioxus::prelude::*;

use lib_sudoku_solver::types::*;

fn main() {
    // launch the web app
    dioxus_web::launch(App);
}

#[derive(Props)]
struct FieldWrapper<'a> {
    field: &'a Field,
}

#[derive(Props)]
struct CellWrapper<'a> {
    cell: &'a Cell,
    selected: &'a bool,
}

fn Div_Field<'a>(cx: Scope<'a, FieldWrapper<'a>>) -> Element {
    let field = cx.props.field;

    cx.render(rsx! {
        table {
            class: "field",
            colgroup { col {}, col {}, col {} }, colgroup { col {}, col {}, col {} }, colgroup { col {}, col {}, col {} },
            (0..3).into_iter().map(|i| rsx!{
                tbody {
                    (0..3).into_iter().map(|j| rsx!{
                        tr {
                            (0..9).into_iter().map(|k| rsx!{
                                td {
                                    Div_Cell{
                                        cell: &field.cells[(i*3+j)*3+k],
                                        selected: &false
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

fn Div_Cell<'a>(cx: Scope<'a, CellWrapper<'a>>) -> Element {
    let cell = cx.props.cell;
    let selected = if *cx.props.selected {
        "selected"
    } else {
        "unselected"
    };

    let f = |vec: [bool; 9], index: usize| {
        "123456789 "
            .chars()
            .nth(if vec[index] { index } else { 9 })
            .unwrap()
    };

    match cell.status {
        CellStatus::FIXED => cx.render(rsx! {
            div {
                class: "cell cell_fixed cell-{selected}",
                    cell.value.to_string()

            }
        }),
        CellStatus::SOLVE => cx.render(rsx! {
            div {
                class: "cell cell_solved cell-{selected}",
                div {
                    cell.value.to_string()
                }
            }
        }),
        CellStatus::DRAFT => cx.render(rsx! {
            div {
                class: "cell cell_draft cell-{selected}",
                (0..9).into_iter().map(|j| {rsx!{
                    div {
                        "{f(cell.drafts.drafts,j)}"
                    },
                }})
            }
        }),
    }
}

// create a component that renders a div with the text "Hello, world!"
fn App(cx: Scope) -> Element {
    let field = use_state(cx, || {
        Field::initial_by_string(
            &"060000000100000054000000700003000001008010070051000000080900000007100000010000000"
                .to_string(),
        )
        .unwrap()
    });

    cx.render(rsx! {
        style {  include_str!("../src/app.css")  },
        div {
            Div_Field {
                field: field
            }
        }
    })
}
