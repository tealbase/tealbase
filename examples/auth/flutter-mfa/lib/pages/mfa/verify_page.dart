import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mfa_app/main.dart';
import 'package:mfa_app/pages/auth/register_page.dart';
import 'package:mfa_app/pages/home_page.dart';
import 'package:tealbase_flutter/tealbase_flutter.dart';

class MFAVerifyPage extends StatefulWidget {
  static const route = '/mfa/verify';
  const MFAVerifyPage({super.key});

  @override
  State<MFAVerifyPage> createState() => _MFAVerifyPageState();
}

class _MFAVerifyPageState extends State<MFAVerifyPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Verify MFA'),
        actions: [
          TextButton(
            onPressed: () {
              tealbase.auth.signOut();
              context.go(RegisterPage.route);
            },
            child: Text(
              'Logout',
              style: TextStyle(color: Theme.of(context).colorScheme.onPrimary),
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(
          horizontal: 20,
          vertical: 24,
        ),
        children: [
          Text(
            'Verification Required',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 16),
          const Text('Enter the code shown in your authentication app.'),
          const SizedBox(height: 16),
          TextFormField(
            decoration: const InputDecoration(
              hintText: '000000',
            ),
            style: const TextStyle(fontSize: 24),
            textAlign: TextAlign.center,
            keyboardType: TextInputType.number,
            onChanged: (value) async {
              if (value.length != 6) return;

              // kick off the verification process once 6 characters are entered
              try {
                final factorsResponse = await tealbase.auth.mfa.listFactors();
                final factor = factorsResponse.totp.first;
                final factorId = factor.id;

                final challenge =
                    await tealbase.auth.mfa.challenge(factorId: factorId);
                await tealbase.auth.mfa.verify(
                  factorId: factorId,
                  challengeId: challenge.id,
                  code: value,
                );
                await tealbase.auth.refreshSession();
                if (mounted) {
                  context.go(HomePage.route);
                }
              } on AuthException catch (error) {
                ScaffoldMessenger.of(context)
                    .showSnackBar(SnackBar(content: Text(error.message)));
              } catch (error) {
                ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Unexpected error occurred')));
              }
            },
          ),
        ],
      ),
    );
  }
}
