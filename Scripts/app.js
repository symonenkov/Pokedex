"use strict";
var pokeAPI = "http://pokeapi.co/api/v1/pokemon/";
var imageSource = "http://pokeapi.co/media/img/";
var offset = 12;
var countOfPokemons;

$.getJSON(pokeAPI, function (data) {
    countOfPokemons = data.meta.total_count;
});

$(document).ready(function () {

    ListOfPokemons(0, 12);

    $(document).on("click", ".margin-wrap", function () {

        $(".margin-wrap.active").removeClass('active');
        $(this).addClass('active');
        if ($(window).width() <= 767) {
            $('.poke-info-wrap').remove();
            PokemonInfo($(this).data("id"));
            $("#myModal").modal();
        }
        else {
            $('.poke-info-wrap').remove();
            PokemonInfo($(this).data("id"));
        }
    });

    $(window).resize(function () {
        if ($(window).width() <= 767) {
            $('.poke-info-wrap').remove();
        }
    });
});

$("#load-more").click(function () {
    ListOfPokemons(offset, 12);
    offset += 12;
    if (offset > countOfPokemons) {
        alert("Pokemons ended.");
    }
});

//Get list of pokemons
function ListOfPokemons(offset, limit) {
    $('#load-more').append("<i class='fa fa-spinner fa-spin' style='font-size:24px' id='spinner'></i>");
    $.getJSON(pokeAPI + "?limit=" + limit + "&offset=" + offset, {
        format: "json"
    })
  .done(function (pokemonsList) {
      $.each(pokemonsList.objects, function (i, item) {
          $("#pokemons-container")
              .append("<div class='col-lg-4 col-md-4 col-xs-6 col-sm-6'><div class='margin-wrap' data-id = "
              + item.national_id + "> <img src="
                + imageSource + item.national_id
                + ".png id='poke-image'><h4>"
                + item.name + "</h4><div class='types' id=" + item.name + "></div></div></div>");

          for (var i = 0; i < item.types.length; i++) {
              $("#" + item.name).append("<span class ='label label-primary pokemon-type' id ="
                  + item.types[i].name + ">"
                  + item.types[i].name + "</span>");
          }
      });
      $("#spinner").remove();
  });

}

function PokemonInfo(id) {
    $('#selected-pokemon').append("<i class='fa fa-spinner fa-spin' style='font-size:24px' id='spinner'></i>");
    var currentSelector;
    $.getJSON(pokeAPI + id, {
        format: "json"
    })
  .done(function (pokemonInfo) {
      if ($(window).width() >= 767) {
          currentSelector = '#selected-pokemon';
      }
      else {
          currentSelector = '.modal-body';
      }
      $(currentSelector).append("<div class=' poke-info-wrap'>"
          + "<img src=" + imageSource + id + ".png id='poke-info-image'>"
          + "<h4>" + pokemonInfo.name + " #" + "000".slice(id.toString().length) + id + "</h4>"
          + "<div id='table'><table class='table table-bordered table-sm'>"
          + "<tbody>"
          + "<tr><td>Type</td><td><span class='table-types'></span></td></tr>"
          + "<tr><td>Attack</td><td>" + pokemonInfo.attack + "</td></tr>"
          + "<tr><td>Defense</td><td>" + pokemonInfo.defense + "</td></tr>"
          + "<tr><td>HP</td><td>" + pokemonInfo.hp + "</td></tr>"
          + "<tr><td>SP Attack</td><td>" + pokemonInfo.sp_atk + "</td></tr>"
          + "<tr><td>SP Defense</td><td>" + pokemonInfo.sp_def + "</td></tr>"
          + "<tr><td>Speed</td><td>" + pokemonInfo.speed + "</td></tr>"
          + "<tr><td>Weight</td><td>" + pokemonInfo.weight + "</td></tr>"
          + "<tr><td>Total moves</td><td>" + pokemonInfo.moves.length + "</td></tr>"
          + "</tbody></div></div>");

      for (var i = 0; i < pokemonInfo.types.length; i++) {
          $(".table-types").append(pokemonInfo.types[i].name + " ");
      }
      $("#spinner").remove();
  });

}

