module Button where

import Window
import Signal
import Color
import List
import Text as T
import Graphics.Element as E
import Graphics.Collage as C
import Graphics.Input exposing (button, customButton)

type alias State  = Int


type CounterEvent =
    Inc
    | Clear


initState = 0


upstate e i =
    case e of
        Clear ->
            0
        Inc ->
            i + 1


vspace = E.spacer 0 10

-- myButton evt s =
--   customButton evt
--     (E.color Color.lightYellow <| button evt s)
--     (E.color Color.lightOrange <| button evt s)
--     (E.color Color.lightBlue   <| button evt s)


strStyle : String -> E.Element
strStyle = T.fromString >> T.height 30 >> E.centered


lineStyle =
  let ls = C.defaultLine in
    { ls | color <- Color.darkCharcoal,
           width <- 10 }


btnW = 200
btnH = 60


myButton evt s =
  let mkBtn c =
    C.collage btnW btnH [ -- TODO: parse error when '[' on next line?
        C.filled c (C.rect btnW btnH)
      , C.outlined lineStyle (C.rect btnW btnH)
      , strStyle s |> C.toForm
    ]
  in
  customButton evt
    (mkBtn Color.lightYellow)
    (mkBtn Color.lightOrange)
    (mkBtn Color.lightBlue)


view (w,h) i =
     E.color Color.gray
  <| E.container w h E.middle
  <| E.flow E.down
  <| List.intersperse vspace
       [ i |> toString |> strStyle |> E.container btnW btnH E.middle
       , myButton (Signal.send ch.address Inc) "Increment"
       , myButton (Signal.send ch.address Clear) "Clear"
       ]


main =
  Signal.map2 view Window.dimensions
    (Signal.foldp upstate initState (ch.signal))