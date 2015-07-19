import Http
import Markdown
import Html exposing (Html, text)
import Task exposing (Task, andThen)


main : Signal Html
main =
  Signal.map text appResolved.signal


-- set up mailbox
--   the signal is piped directly to main
--   the address lets us update the signal
appResolved : Signal.Mailbox String
appResolved =
  Signal.mailbox ""

type Action = Load String

-- send some markdown to our readme mailbox
report : String -> Task x ()
report app =
  Signal.send appResolved.address app


-- get the readme *and then* send the result to our mailbox
port fetchApp : Task Http.Error ()
port fetchApp =
  Http.getString (mkUrl "bah") `andThen` report


-- the URL of the README.md that we desire
baseUrl : String
baseUrl =
  "http://192.168.56.1:4568/api/app/id/"

mkUrl : String -> String
mkUrl s = baseUrl ++ s