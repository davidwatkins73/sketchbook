module Stamper where

import Color exposing (..)
import Graphics.Collage exposing (..)
import Graphics.Element exposing (..)
import List
import List exposing ((::), length)
import Mouse
import Signal
import Window
import Debug exposing (log)


main : Signal Element
main =
  Signal.map2 renderStamps Window.dimensions clickLocations


addClick : (Int, Int) -> List(Int, Int) ->  List(Int, Int)
addClick v s =  log (toString (v, s)) v::s


clickLocations : Signal (List (Int,Int))
clickLocations =
  Signal.foldp addClick [] (Signal.sampleOn Mouse.clicks Mouse.position)


renderStamps : (Int,Int) -> List (Int,Int) -> Element
renderStamps (w,h) locs =
  let pentagon (x,y) =
        ngon 5 20
          |> filled (hsla (toFloat x) 1 0.4 0.7)
          |> move (toFloat x - toFloat w / 2, toFloat h / 2 - toFloat y)
          |> rotate (toFloat x)
  in
      layers
        [ collage w h (List.map pentagon locs)
        , show "Click to stamp a pentagon."
        , container 200 200 middle
            <| show
            <| "Bob" ++ toString (length locs)
        ]
