module AppView where

import Html exposing (Html, button, div, h1, span, text)
import Html.Events exposing (onClick)
import StartApp
import Signal
import Debug exposing (log)
import Http
import Result
import Task exposing (Task, mapError, andThen, fail)
import Json.Decode as Json exposing ((:=), succeed)

main =
  Signal.map2 view query.signal results.signal


query : Signal.Mailbox Action
query =
  Signal.mailbox Clear


results : Signal.Mailbox (Result String App)
results =
  Signal.mailbox (Err "Problemo")


port requests : Signal (Task x ())
port requests =
  Signal.map handleAction query.signal
    |> Signal.map (\task -> Task.toResult task `andThen` Signal.send results.address)


handleAction : Action -> Task String App
handleAction a =
    case a of
        Clear ->
            fail "Cleared"
        Load id ->
            Task.succeed (mkUrl id) `andThen` (mapError (always "Doom!") << Http.get parseApp)


parseApp : Json.Decoder (App)
parseApp =
    Json.object3
        (\name description aliases -> App name description aliases)
        ("name" := Json.string)
        ("description" := Json.string)
        ("aliases" := Json.list Json.string)


url : String
url =
    "http://192.168.56.1:4568/api/app/id/"


mkUrl : String -> String
mkUrl s =
    url ++ s


-- VIEW

view : Action -> Result String App -> Html
view q r =
    let buttons =
            div []
                [ button
                    [onClick query.address Clear ]
                    [text "Clear"]
                , button
                    [onClick query.address (Load "a1") ]
                    [text "Load"]
                ]
        panel =
            case r of
                Ok app ->
                    div []
                        [ h1 [] [text "Application"]
                        , span [] [text (app.name)]
                        ]
                Err err ->
                    text err


    in
        log (toString r) (div [] [ buttons, panel ])


-- MODEL

type alias App =
  { name : String
  , description : String
  , aliases : List(String)
  }


type Action =
    Load String
    | Clear


