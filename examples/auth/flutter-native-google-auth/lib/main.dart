import 'package:flutter/material.dart';
import 'package:myauthapp/screens/login_screen.dart';
import 'package:tealbase_flutter/tealbase_flutter.dart';

void main() async {
  /// TODO: update Tealbase credentials with your own
  await Tealbase.initialize(
    url: 'YOUR_TEALBASE_URL',
    anonKey: 'YOUR_ANON_KEY',
  );
  runApp(const MyApp());
}

final tealbase = Tealbase.instance.client;

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Auth',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const LoginScreen(),
    );
  }
}
