# Generated by Django 3.2.9 on 2021-12-14 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_hospitaluser_mail'),
    ]

    operations = [
        migrations.AddField(
            model_name='visit',
            name='cost',
            field=models.IntegerField(default=30),
            preserve_default=False,
        ),
    ]
