module PureButtons where

import List
import Text as T
import Signal
import Graphics.Element exposing (color)
import Graphics.Element as E
import Graphics.Collage as C
import Color
import Mouse

type alias Pt = (Int, Int)

type alias State = (Pt, Int)
initState = ((-1,-1), 0)

btnW = 200
btnH = 60

upstate : Pt -> State -> State
upstate (x,y) (_,i) =
  let inPlace i x y = x <= btnW && y >= i * btnH && y < (i+1) * btnH in
  let j =
    if | inPlace 1 x y -> i + 1    -- Increment "button"
       | inPlace 2 x y -> 0        -- Clear "button"
       | otherwise     -> i        -- elsewhere
  in
  ((x,y), j)

strStyle : String -> E.Element
strStyle = T.fromString >> T.height 30 >> E.centered

view : State -> E.Element
view st =
  let rows     = 3
      w        = btnW
      h        = rows * btnH
      place i  = C.moveY (btnH - (i-1)*btnH)
      rect c   = C.filled c (C.rect btnW btnH)
      text c s = C.toForm <| color c <| strStyle s
  in
  C.collage w h
    [ place 1 <| rect Color.lightGray
    , place 1 <| text Color.lightGray <| toString (snd st)
    , place 2 <| rect Color.lightYellow
    , place 2 <| text Color.lightYellow "Increment"
    , place 3 <| rect Color.lightOrange
    , place 3 <| text Color.lightOrange "Clear"
    , C.outlined C.defaultLine (C.rect w h)
    ]

clickPositions : Signal Pt
clickPositions = Signal.sampleOn Mouse.clicks Mouse.position

main =
  Signal.map view
    (Signal.foldp upstate initState clickPositions)
