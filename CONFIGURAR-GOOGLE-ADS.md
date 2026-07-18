# Configuração final do Google Ads

O site já preserva UTMs e `gclid`, envia `landing_view` e `begin_checkout` ao `dataLayer` e respeita a escolha de cookies. Não coloque IDs de exemplo em produção.

## Dados que ainda precisam vir da conta Google

- Tag Google Ads instalada no site: `AW-18269319435`.
- Ação de conversão recebida: `AW-18269319435/byztCLr5ysgcEIvivodE`.
- Valor efetivamente cobrado, caso existam preços ou cupons diferentes.

## Conversão principal: compra aprovada

Configure na Kiwify a integração oficial do Google Ads, quando disponível, ou dispare a conversão apenas na página pós-compra confirmada. Use:

- nome: `Compra aprovada`;
- categoria: Compra;
- valor: usar o valor da transação;
- moeda: BRL;
- contagem: uma;
- incluir em “Conversões”: sim;
- atribuição: orientada por dados, quando disponível.

Não use o clique no botão como compra. O evento `begin_checkout` do site deve ser uma conversão secundária.

O evento de compra **não foi colocado na página de vendas**, pois isso registraria visitantes como compradores. Configure este evento apenas na confirmação de pagamento da Kiwify:

```html
<script>
gtag('event', 'conversion', {
  'send_to': 'AW-18269319435/byztCLr5ysgcEIvivodE',
  'value': 147.0,
  'currency': 'BRL'
});
</script>
```

Se a Kiwify fornecer o valor real e o identificador da transação automaticamente, prefira os campos dinâmicos da integração. O valor `1.0` do código originalmente fornecido não representa o preço de R$ 147.

## Teste obrigatório

1. Abrir uma URL com `?utm_source=teste&utm_medium=cpc&utm_campaign=validacao`.
2. Aceitar ou recusar cookies e confirmar que o site continua funcionando.
3. Clicar no checkout e verificar `begin_checkout` no modo Preview do Google Tag Manager.
4. Realizar uma compra de teste.
5. Confirmar que `Compra aprovada` aparece uma única vez no Google Ads e com valor em BRL.
6. Confirmar entrega do e-mail, criação da senha e acesso ao app.

## Campanha inicial

Comece com Pesquisa. Evite promessas de quilos em prazo determinado, diagnóstico, cura, resultado garantido, vergonha corporal e perguntas que afirmem uma condição de saúde do visitante.
