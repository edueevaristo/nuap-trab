let tipo1 = false;
let tipo2 = false;
let horariosDia = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
let passoAtual = 1;

$(document).ready(function () {

  mostrarPasso(1);
  gerarHorarios();
  $('#step-1').addClass('active');

  /* Validando se o input de checkbox foi clicado */
  $('#tipo-agendamento-1').change(function () {
    if ($(this).is(':checked')) {
      tipo1 = true;
    } else {
      tipo1 = false;
    }
  });

  $('#tipo-agendamento-2').change(function () {
    if ($(this).is(':checked')) {
      tipo2 = true;
    } else {
      tipo2 = false;
    }
  });

  $('#step-1-next').click(function () {
    validar = validarTipos();

    if (validar == false) {
      return false;
    } else {
      proximoPasso();
    }
  });

  var valores = [];
  $('.select-analista input[type="checkbox"]').change(function () {
    $('.select-analista input[type="checkbox"]:checked').each(function () {
      var valor = $(this).next('label').text().trim();
      valores.push(valor);
    });
  })

});


function mostrarPasso(step) {
  $(`#step${step}`).show();
}

function esconderPasso(step) {
  $(`#step${step}`).hide();
}

function proximoPasso() {
  esconderPasso(passoAtual);
  passoAtual++;
  mostrarPasso(passoAtual);

  if (passoAtual === 1) {
    $('#step-1').addClass('active');
    $('#step-2').removeClass('active').addClass('disabled');
    $('#step-3').removeClass('active').addClass('disabled');
    $('#step-4').removeClass('active').addClass('disabled');

  } else if (passoAtual === 2) {
    $('#step-1').removeClass('active');
    $('#step-2').addClass('active');
    $('#step-3').removeClass('active').addClass('disabled');
    $('#step-4').removeClass('active').addClass('disabled');

  } else if (passoAtual === 3) {
    $('#step-1').removeClass('active');
    $('#step-2').removeClass('active');
    $('#step-3').addClass('active');
    $('#step-4').removeClass('active').addClass('disabled');

  }
}

function voltarPasso() {

  esconderPasso(passoAtual);
  passoAtual--;
  mostrarPasso(passoAtual);

  if (passoAtual === 1) {
    $('#step-1').addClass('active');
    $('#step-2').removeClass('active').addClass('disabled');
    $('#step-3').removeClass('active').addClass('disabled');
    $('#step-4').removeClass('active').addClass('disabled');

  } else if (passoAtual === 2) {
    $('#step-1').removeClass('active');
    $('#step-2').addClass('active');
    $('#step-3').removeClass('active').addClass('disabled');
    $('#step-4').removeClass('active').addClass('disabled');

  } else if (passoAtual === 3) {
    $('#step-1').removeClass('active');
    $('#step-2').removeClass('active');
    $('#step-3').addClass('active');
    $('#step-4').removeClass('active').addClass('disabled');

  }
}

function validarTipos() {
  if (tipo1 && tipo2) {
    alert("Há dois tipos de atendimento selecionados. Selecione apenas um deles para prosseguir.")
    return false;
  }
}

function gerarHorarios() {
  var divHorarios = $('#horarios-disponiveis');
  divHorarios.empty(); // Limpa os horários existentes antes de gerar novamente

  for (var i = 0; i < horariosDia.length; i++) {
    var horario = horariosDia[i];
    var checkbox = $('<input type="checkbox" value="' + horario + '" class="form-check-input style-tipo-agendamento-2">');
    var label = $('<label class="form-check-label text-size-agendamento-2 mr-3">').text(horario);
    divHorarios.append($('<div class="form-check">').append(checkbox).append(label));
  }
}

function finalizarAgendamento() {
  const swalWithBootstrapButtons = Swal.mixin({
    buttonsStyling: true
  });
  
  swalWithBootstrapButtons.fire({
    title: 'Você tem certeza?',
    text: "A ação não poderá ser revertida!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, prosseguir com o agendamento.',
    cancelButtonText: 'Não, cancele.',
    reverseButtons: true,
    customClass: {
      confirmButton: 'swal-button-spacing',
      cancelButton: 'swal-button-spacing'
    },
    buttonsStyling: false,
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger'
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Agendamento realizado com sucesso!',
        'O seu agendamento foi concluído, em breve, entraremos em contato com você para mais informações!',
        'success'
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelado com sucesso!',
        'Salvamos em algum lugar de sua memória mental :)',
        'error'
      );
      
    }
  });
  setInterval(() => {
    location.reload();
  }, 6900);
  
}