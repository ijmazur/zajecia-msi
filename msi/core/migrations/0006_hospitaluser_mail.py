# Generated by Django 3.2.9 on 2021-12-07 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_examresult_visit'),
    ]

    operations = [
        migrations.AddField(
            model_name='hospitaluser',
            name='mail',
            field=models.EmailField(default='test@test.com', max_length=254),
            preserve_default=False,
        ),
    ]
