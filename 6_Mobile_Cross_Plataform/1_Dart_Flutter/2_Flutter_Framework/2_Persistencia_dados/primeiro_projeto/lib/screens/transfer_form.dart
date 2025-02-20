// ==== ESSA CLASSE FUNCIONA COMO UMA PÁGINA ==== //
// ==== EXIBE O FORMULÁRIO PARA CRIAÇÃO DE UM NOVO ITEM ==== //
import 'package:flutter/material.dart';
import 'package:primeiro_projeto/components/elevated_button.dart';
import 'package:primeiro_projeto/components/form_input.dart';

class TransferForm extends StatelessWidget {
  TransferForm({Key? key}) : super(key: key);

  // ==== Controladores de inputs - são ponteiros para os inputs - https://api.flutter.dev/flutter/widgets/TextEditingController-class.html ==== //
  final TextEditingController _AccountController = TextEditingController();
  final TextEditingController _ValueController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transfer Creation'),
        backgroundColor: Colors.green,
      ),
      // ==== O formulário foi montado nesse widget "column" - que é uma coluna ==== //
      // ==== São dois inputs "TextField" que foram colocados no encaixe "children" do widget "column" ==== //
      // ==== Além disso, cada input foi embrulhado por um widget de padding ==== //
      body: Column(
        children: [
          // ==== Inputs gerados por classe ==== //
          FormInputGenerator("Transfer Value", "Inform the value", Icons.monetization_on, _ValueController),
          FormInputGenerator("Bank account number", "0000", Icons.person, _AccountController),
          // ==== Botão gerado por classe ==== //
          ElevatedButtonGenerator("Confirmar", [_ValueController, _AccountController]),
        ],
      ),
    );
  }
}
