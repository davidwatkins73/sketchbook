module AppView where

import Html exposing (Html, Attribute, button, div, h1, h2, span, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import StartApp
import Signal
import Debug exposing (log)
import Http
import Result
import Maybe exposing (Maybe)
import Task exposing (Task, mapError, andThen, fail)
import Json.Decode as Json exposing ((:=), succeed)

main =
  Signal.map2 view query.signal results.signal


query : Signal.Mailbox Action
query =
  Signal.mailbox Clear


results : Signal.Mailbox (Result String (Maybe App))
results =
  Signal.mailbox (Ok Nothing)


port requests : Signal (Task x ())
port requests =
  Signal.map handleAction query.signal
    |> Signal.map (\task -> Task.toResult task `andThen` Signal.send results.address)


handleAction : Action -> Task String (Maybe App)
handleAction a =
    case a of
        Clear ->
            Task.succeed Nothing
        Load id ->
            Task.succeed (mkUrl id)
            `andThen`
            fetchApp
            `andThen`
            \x ->  Task.succeed ( Just x )


fetchApp : String -> Task String App
fetchApp =
    mapError toString
        << Http.get parseApp



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

view : Action -> Result String (Maybe App) -> Html
view q r =
    let buttons =
            div []
                [ button
                    [onClick query.address Clear ]
                    [text "Clear"]
                , button
                    [onClick query.address (Load "app1") ]
                    [text "Load 1"]
                , button
                    [onClick query.address (Load "app2") ]
                    [text "Load 2"]
                , button
                    [onClick query.address (Load "bad") ]
                    [text "Load Bad"]
                ]
        panel =
            case r of
                Ok (Just app) ->
                    div []
                        [ h1 titleStyle [text "Application"]
                        , span [] [text (app.name)]
                        ]
                Ok (Nothing) ->
                    text "zzzzz"
                Err err ->
                    div []
                        [ h2 errorStyle [text "Error!"]
                        , text err
                        ]


    in
        div [] [ buttons, panel ]


titleStyle : List Attribute
titleStyle =
    style [ ("color", "green")] :: []

errorStyle : List Attribute
errorStyle =
    style [ ("color", "red")] :: []

-- MODEL

type alias App =
  { name : String
  , description : String
  , aliases : List(String)
  }


type Action =
    Load String
    | Clear


