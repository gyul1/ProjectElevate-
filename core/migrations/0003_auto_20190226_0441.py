# Generated by Django 2.1.4 on 2019-02-26 04:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_user_business_fk'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='name',
            new_name='first_name',
        ),
    ]
