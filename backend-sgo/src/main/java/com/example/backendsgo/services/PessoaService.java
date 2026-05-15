package com.example.backendsgo.services;

import com.example.backendsgo.DTOs.PessoaCOM;
import com.example.backendsgo.entities.Login;
import com.example.backendsgo.entities.Pessoa;
import com.example.backendsgo.entities.PessoaFisica;
import com.example.backendsgo.entities.PessoaJuridica;
import com.example.backendsgo.exception.NotFoundException;
import com.example.backendsgo.repositories.LoginRepository;
import com.example.backendsgo.repositories.PessoaFisicaRepository;
import com.example.backendsgo.repositories.PessoaJuridicaRepository;
import com.example.backendsgo.repositories.PessoaRepository;
import com.example.backendsgo.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PessoaService {
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private PessoaFisicaRepository FisicaRepository;
    @Autowired
    private PessoaJuridicaRepository JuridicaRepository;
    @Autowired
    private PessoaRepository PessoaRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private boolean validarCPF(String cpf) {
        if (cpf == null)
            return false;

        cpf = cpf.replaceAll("[^\\d]", "");

        if (cpf.length() != 11)
            return false;

        if (cpf.matches("(\\d)\\1{10}"))
            return false;

        try {
            int soma = 0;
            int peso = 10;

            for (int i = 0; i < 9; i++) {
                soma += (cpf.charAt(i) - '0') * peso--;
            }

            int resto = 11 - (soma % 11);
            int digito1 = (resto > 9) ? 0 : resto;

            soma = 0;
            peso = 11;

            for (int i = 0; i < 10; i++) {
                soma += (cpf.charAt(i) - '0') * peso--;
            }

            resto = 11 - (soma % 11);
            int digito2 = (resto > 9) ? 0 : resto;

            return digito1 == (cpf.charAt(9) - '0') && digito2 == (cpf.charAt(10) - '0');

        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public PessoaCOM salvarFisica(PessoaCOM pessoaCOM){
        Pessoa novaPessoa;
        if(pessoaCOM.getId() == 0){
            novaPessoa = new Pessoa(pessoaCOM.getNome(),
                    pessoaCOM.getEmail(),
                    pessoaCOM.getNivel());
        }
        else {
            if(PessoaRepository.findById(pessoaCOM.getId()).orElse(null) == null)
                throw new NotFoundException("Id de pessoa fisica não encontrado!");

            novaPessoa = new Pessoa(pessoaCOM.getId(),
                    pessoaCOM.getNome(),
                    pessoaCOM.getEmail(),
                    pessoaCOM.getNivel());
        }
        Long id = pessoaCOM.getId();

        if(pessoaCOM.getNome().isEmpty() || pessoaCOM.getEmail().isEmpty() || pessoaCOM.getNivel() == 0 || pessoaCOM.getIdentificacao().isEmpty()){
            throw new BadRequestException("informe todos os campos obrigatorios!!");
        }

        novaPessoa = PessoaRepository.save(novaPessoa);
        pessoaCOM.setId(novaPessoa.getId());

        if(id == 0) {
            if(validarCPF(pessoaCOM.getIdentificacao())) {

                if (FisicaRepository.existsByCpf(pessoaCOM.getIdentificacao())){
                    throw new BadRequestException("CPF já cadastrado");
                }

                PessoaFisica pessoaF = new PessoaFisica(novaPessoa,
                        pessoaCOM.getIdentificacao());
                pessoaF = FisicaRepository.save(pessoaF);

                String senhaCriptografada =
                        passwordEncoder.encode(pessoaCOM.getIdentificacao());

                Login login = new Login(
                        novaPessoa,
                        novaPessoa.getEmail(),
                        senhaCriptografada
                );
                login = loginRepository.save(login);
            }
            else {
                throw new BadRequestException("CFP inválido!!");
            }
        }

        return pessoaCOM;
    }

    private boolean validarCNPJ(String cnpj) {
        if (cnpj == null)
            return false;

        cnpj = cnpj.replaceAll("[^\\d]", "");

        if (cnpj.length() != 14)
            return false;

        if (cnpj.matches("(\\d)\\1{13}"))
            return false;

        try {
            int soma = 0;
            int peso = 5;

            for (int i = 0; i < 12; i++) {
                soma += (cnpj.charAt(i) - '0') * peso--;
                if (peso < 2) peso = 9;
            }

            int resto = soma % 11;
            int digito1 = (resto < 2) ? 0 : 11 - resto;

            soma = 0;
            peso = 6;

            for (int i = 0; i < 13; i++) {
                soma += (cnpj.charAt(i) - '0') * peso--;
                if (peso < 2) peso = 9;
            }

            resto = soma % 11;
            int digito2 = (resto < 2) ? 0 : 11 - resto;

            return digito1 == (cnpj.charAt(12) - '0') && digito2 == (cnpj.charAt(13) - '0');

        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public PessoaCOM salvarJuridica(PessoaCOM pessoaCOM){
        Pessoa novaPessoa;
        if(pessoaCOM.getId() == 0){
            novaPessoa = new Pessoa(pessoaCOM.getNome(),
                    pessoaCOM.getEmail(),
                    pessoaCOM.getNivel());
        }
        else {
            if(PessoaRepository.findById(pessoaCOM.getId()).orElse(null) == null)
                throw new NotFoundException("Id de pessoa juridica não encontrado!");
            novaPessoa = new Pessoa(pessoaCOM.getId(),
                    pessoaCOM.getNome(),
                    pessoaCOM.getEmail(),
                    pessoaCOM.getNivel());
        }
        Long id = pessoaCOM.getId();

        if(pessoaCOM.getNome().isEmpty() || pessoaCOM.getEmail().isEmpty() || pessoaCOM.getNivel() == 0 || pessoaCOM.getIdentificacao().isEmpty()){
            throw new BadRequestException("Informe todos os campos obrigatorios!!");
        }

        novaPessoa = PessoaRepository.save(novaPessoa);
        pessoaCOM.setId(novaPessoa.getId());
        if(validarCNPJ(pessoaCOM.getIdentificacao())) {
            if (id == 0) {
                if (JuridicaRepository.existsByCnpj((pessoaCOM.getIdentificacao()))){
                    throw new BadRequestException("CNPJ já cadastrado");
                }

                PessoaJuridica pessoaJ = new PessoaJuridica(novaPessoa,
                        pessoaCOM.getIdentificacao());
                pessoaJ = JuridicaRepository.save(pessoaJ);

                String senhaCriptografada =
                        passwordEncoder.encode(pessoaCOM.getIdentificacao());

                Login login = new Login(
                        novaPessoa,
                        novaPessoa.getEmail(),
                        senhaCriptografada
                );
                login = loginRepository.save(login);
            }
        }else {
            throw new BadRequestException("CNPJ inválido!!");
        }

        return pessoaCOM;
    }

    public List<PessoaCOM> listarPessoas(){
        List<Pessoa> pessoa = PessoaRepository.findAll();

        if(!pessoa.isEmpty()) {
            List<PessoaFisica> pessoaF = FisicaRepository.findAll();
            List<PessoaJuridica> pessoaJ = JuridicaRepository.findAll();
            List<PessoaCOM> pessoas = new ArrayList<>();
            int i;
            for (PessoaFisica p : pessoaF) {
                i = 0;
                while (i < pessoa.size() && p.getId() != pessoa.get(i).getId()) {
                    i++;
                }

                if (i < pessoa.size()) {
                    pessoas.add(new PessoaCOM(pessoa.get(i).getId(),
                            pessoa.get(i).getNome(),
                            pessoa.get(i).getEmail(),
                            pessoa.get(i).getNivel(),
                            p.getCpf()));
                }
            }

            for (PessoaJuridica p : pessoaJ) {
                i = 0;
                while (i < pessoa.size() && p.getId() != pessoa.get(i).getId()) {
                    i++;
                }

                if (i < pessoa.size()) {
                    pessoas.add(new PessoaCOM(pessoa.get(i).getId(),
                            pessoa.get(i).getNome(),
                            pessoa.get(i).getEmail(),
                            pessoa.get(i).getNivel(),
                            p.getCnpj()));
                }
            }

            return pessoas;
        }
        else
            throw new NotFoundException("Sem usuários cadastrados!!");
    }

    public PessoaCOM pessoabyId(Long id){
        Pessoa pessoa = PessoaRepository.findById(id).orElse(null);
        if(pessoa == null){
            throw new NotFoundException("Id não encontrado");
        }
        else {

            PessoaCOM pessoaCOM = new PessoaCOM(pessoa.getId(),
                    pessoa.getNome(),
                    pessoa.getEmail(),
                    pessoa.getNivel(),"");

            PessoaJuridica pessoaJuridica= JuridicaRepository.findById(id).orElse(null);
            if(pessoaJuridica == null){
                PessoaFisica pessoaFisica= FisicaRepository.findById(id).orElse(null);
                if(pessoaFisica == null)
                    throw new NotFoundException("Id_F_J não encontrado");

                pessoaCOM.setIdentificacao(pessoaFisica.getCpf());
            }
            else
                pessoaCOM.setIdentificacao(pessoaJuridica.getCnpj());

            return pessoaCOM;

        }

    }

    public List<PessoaCOM> PessoaByNome(String nome){
        List<Pessoa> Pessoa = PessoaRepository.findByNomeContainingIgnoreCase(nome);

        if(!Pessoa.isEmpty()) {
            PessoaFisica pessoaFisica;
            PessoaJuridica pessoaJuridica;
            List<PessoaCOM> pessoas = new ArrayList<>();
            PessoaCOM pessoaCOM;

            for (Pessoa p : Pessoa) {
                pessoaCOM = new PessoaCOM(p.getId(),
                        p.getNome(),
                        p.getEmail(),
                        p.getNivel(),
                        "");

                pessoaFisica = FisicaRepository.findById(p.getId()).orElse(null);
                if (pessoaFisica == null) {
                    pessoaJuridica = JuridicaRepository.findById(p.getId()).orElse(null);
                    if (pessoaJuridica == null) {
                        throw new NotFoundException("Erro ao encontrar Pessoa");
                    } else
                        pessoaCOM.setIdentificacao(pessoaJuridica.getCnpj());
                } else
                    pessoaCOM.setIdentificacao(pessoaFisica.getCpf());

                pessoas.add(pessoaCOM);

            }

            return pessoas;
        }
        else
            throw new NotFoundException("Erro ao encontrar Pessoas");
    }

    @Transactional
    public void deletarPessoa(Long id) {
        Pessoa pessoa = PessoaRepository.findById(id).orElse(null);

        if (pessoa != null)
        {
            PessoaFisica pessoaFisica = FisicaRepository.findById(id).orElse(null);
            if (pessoaFisica == null) {
                PessoaJuridica pessoaJuridica = JuridicaRepository.findById(id).orElse(null);
                if (pessoaJuridica == null) {
                    throw new NotFoundException("Erro ao encontrar Usuario");
                } else
                    JuridicaRepository.delete(pessoaJuridica);
            } else
                FisicaRepository.delete(pessoaFisica);

            Login login = loginRepository.findById(id).orElse(null);
            if (login != null) {
                loginRepository.delete(login);
            }
            else
                throw new NotFoundException("Erro ao encontrar Login");

            PessoaRepository.delete(pessoa);
        }
        else
            throw new NotFoundException("Erro ao encontrar Usuario");
    }

    public List<Pessoa> pessoabyNivel(int nivel) {
        //List<Pessoa> pessoas = PessoaRepository.findByNivel(nivel);
        List<Pessoa> pessoas = PessoaRepository.findByNivelOrderByNomeAsc(nivel);

        if(pessoas.isEmpty()) {
            throw new NotFoundException("Erro ao encontrar Lista de Pessoas");
        }

        return pessoas;
    }
}
