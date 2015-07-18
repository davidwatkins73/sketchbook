import Html exposing (div, button, text)
import Html.Events exposing (onClick)
import StartApp
import Signal exposing (Address, Mailbox, mailbox)
import Debug exposing (log)

main =
  StartApp.start { model = model, view = view, update = update }


model = 0


view address model =
    div []
      [ button [ onClick address Decrement ] [ text "-" ]
      , div [] [ text (toString model) ]
      , button [ onClick address Increment ] [ text "+" ]
      ]


type Action
  = Increment
  | Decrement


update action model =
  log (toString action) <|
  case action of
    Increment -> model + 1
    Decrement -> model - 1
